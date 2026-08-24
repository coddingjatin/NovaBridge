import { CodingHandles, GitHubStats, LeetCodeStats, CodeforcesStats } from '../types/profile';

export interface SyncedDataResult {
  gh: GitHubStats;
  cf: CodeforcesStats;
  lc: LeetCodeStats;
  cc: any;
  hr: any;
  cs: any;
  li: any;
}

/**
 * Fetch LeetCode Real Data using official LeetCode GraphQL query via CORS proxy
 */
async function fetchLeetCodeRealData(username: string): Promise<Partial<LeetCodeStats> | null> {
  const query = `
    query userProblemsSolved($username: String!) {
      matchedUser(username: $username) {
        username
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
        profile {
          ranking
          reputation
        }
      }
    }
  `;

  // Approach 1: Official GraphQL via CorsProxy.io
  try {
    const res = await fetch('https://corsproxy.io/?https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables: { username } })
    });
    if (res.ok) {
      const json = await res.json();
      if (json?.data?.matchedUser) {
        const user = json.data.matchedUser;
        const stats = user.submitStatsGlobal?.acSubmissionNum || [];
        const allItem = stats.find((s: any) => s.difficulty === 'All');
        const easyItem = stats.find((s: any) => s.difficulty === 'Easy');
        const mediumItem = stats.find((s: any) => s.difficulty === 'Medium');
        const hardItem = stats.find((s: any) => s.difficulty === 'Hard');

        return {
          username: user.username,
          totalSolved: allItem?.count ?? 0,
          easySolved: easyItem?.count ?? 0,
          mediumSolved: mediumItem?.count ?? 0,
          hardSolved: hardItem?.count ?? 0,
          ranking: user.profile?.ranking ?? 0,
        };
      }
    }
  } catch (e) {
    console.warn('LeetCode CorsProxy GraphQL fetch notice:', e);
  }

  // Approach 2: leetcode-stats-api.herokuapp.com
  try {
    const res2 = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
    if (res2.ok) {
      const data2 = await res2.json();
      if (data2.status === 'success' || data2.totalSolved !== undefined) {
        return {
          username,
          totalSolved: data2.totalSolved ?? 0,
          easySolved: data2.easySolved ?? 0,
          mediumSolved: data2.mediumSolved ?? 0,
          hardSolved: data2.hardSolved ?? 0,
          ranking: data2.ranking ?? 0,
          acceptanceRate: data2.acceptanceRate ?? 70.0
        };
      }
    }
  } catch (e) {
    console.warn('LeetCode Heroku API notice:', e);
  }

  // Approach 3: alfa-leetcode-api.onrender.com/userProfile/
  try {
    const res3 = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${username}`);
    if (res3.ok) {
      const data3 = await res3.json();
      if (data3.totalSolved !== undefined) {
        return {
          username,
          totalSolved: data3.totalSolved ?? 0,
          easySolved: data3.easySolved ?? 0,
          mediumSolved: data3.mediumSolved ?? 0,
          hardSolved: data3.hardSolved ?? 0,
          ranking: data3.ranking ?? 0
        };
      }
    }
  } catch (e) {
    console.warn('LeetCode Render API notice:', e);
  }

  return null;
}

/**
 * Robust real-time API fetcher for GitHub, Codeforces, LeetCode, CodeChef & HackerRank
 */
export const syncAllProfiles = async (
  handles: CodingHandles,
  current: {
    gh: GitHubStats;
    cf: CodeforcesStats;
    lc: LeetCodeStats;
    cc: any;
    hr: any;
    cs: any;
    li: any;
  }
): Promise<SyncedDataResult> => {
  let updatedGh: GitHubStats = { ...current.gh, username: handles.github || current.gh.username, lastSynced: 'Just now' };
  let updatedCf: CodeforcesStats = { ...current.cf, handle: handles.codeforces || current.cf.handle, lastSynced: 'Just now' };
  let updatedLc: LeetCodeStats = { ...current.lc, username: handles.leetcode || current.lc.username, lastSynced: 'Just now' };
  let updatedCc = { ...current.cc, handle: handles.codechef || current.cc.handle };
  let updatedHr = { ...current.hr, handle: handles.hackerrank || current.hr.handle };

  const fetchPromises = [];

  // 1. Fetch Real GitHub Data
  if (handles.github && handles.github.trim()) {
    const ghUser = handles.github.trim();
    fetchPromises.push(
      (async () => {
        try {
          const res = await fetch(`https://api.github.com/users/${ghUser}`);
          if (res.ok) {
            const ghData = await res.json();
            updatedGh.username = ghUser;
            updatedGh.publicRepos = ghData.public_repos ?? updatedGh.publicRepos;
            updatedGh.followers = ghData.followers ?? updatedGh.followers;
            updatedGh.following = ghData.following ?? updatedGh.following;

            const reposRes = await fetch(`https://api.github.com/users/${ghUser}/repos?per_page=100`);
            if (reposRes.ok) {
              const repos = await reposRes.json();
              if (Array.isArray(repos)) {
                const totalStars = repos.reduce((acc: number, r: any) => acc + (r.stargazers_count || 0), 0);
                updatedGh.stars = totalStars;
              }
            }
          }
        } catch (e) {
          console.warn('GitHub API fetch notice:', e);
        }
      })()
    );
  }

  // 2. Fetch Real Codeforces Data
  if (handles.codeforces && handles.codeforces.trim()) {
    const cfUser = handles.codeforces.trim();
    fetchPromises.push(
      (async () => {
        try {
          const res = await fetch(`https://codeforces.com/api/user.info?handles=${cfUser}`);
          if (res.ok) {
            const json = await res.json();
            if (json.status === 'OK' && json.result && json.result.length > 0) {
              const userObj = json.result[0];
              updatedCf.handle = cfUser;
              updatedCf.rating = userObj.rating ?? updatedCf.rating;
              updatedCf.maxRating = userObj.maxRating ?? updatedCf.maxRating;
              updatedCf.rank = userObj.rank ? (userObj.rank.charAt(0).toUpperCase() + userObj.rank.slice(1)) : updatedCf.rank;
              updatedCf.maxRank = userObj.maxRank ? (userObj.maxRank.charAt(0).toUpperCase() + userObj.maxRank.slice(1)) : updatedCf.maxRank;
            }
          }

          const ratingRes = await fetch(`https://codeforces.com/api/user.rating?handle=${cfUser}`);
          if (ratingRes.ok) {
            const rJson = await ratingRes.json();
            if (rJson.status === 'OK' && Array.isArray(rJson.result)) {
              updatedCf.totalContests = rJson.result.length;
            }
          }
        } catch (e) {
          console.warn('Codeforces API fetch notice:', e);
        }
      })()
    );
  }

  // 3. Fetch Real LeetCode Data (Using Official GraphQL Proxy + Fallbacks)
  if (handles.leetcode && handles.leetcode.trim()) {
    const lcUser = handles.leetcode.trim();
    fetchPromises.push(
      (async () => {
        const lcData = await fetchLeetCodeRealData(lcUser);
        if (lcData) {
          updatedLc = {
            ...updatedLc,
            ...lcData,
            username: lcUser,
            lastSynced: 'Just now'
          };
        } else {
          updatedLc.username = lcUser;
        }
      })()
    );
  }

  // 4. Fetch Real CodeChef Data
  if (handles.codechef && handles.codechef.trim()) {
    const ccUser = handles.codechef.trim();
    fetchPromises.push(
      (async () => {
        try {
          const res = await fetch(`https://codechef-api.vercel.app/handle/${ccUser}`);
          if (res.ok) {
            const ccData = await res.json();
            if (ccData.success !== false && ccData.currentRating) {
              updatedCc.handle = ccUser;
              updatedCc.rating = ccData.currentRating ?? updatedCc.rating;
              updatedCc.stars = ccData.stars ?? updatedCc.stars;
              updatedCc.globalRank = ccData.globalRank ?? updatedCc.globalRank;
            }
          }
        } catch (e) {
          updatedCc.handle = ccUser;
        }
      })()
    );
  }

  await Promise.allSettled(fetchPromises);

  return {
    gh: updatedGh,
    cf: updatedCf,
    lc: updatedLc,
    cc: updatedCc,
    hr: updatedHr,
    cs: current.cs,
    li: current.li
  };
};
