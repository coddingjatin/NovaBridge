async function testAllPlatforms() {
  console.log('=== 1. Testing GitHub API ===');
  try {
    const ghUser = await fetch('https://api.github.com/users/torvalds');
    const ghData = await ghUser.json();
    console.log('GitHub Real Data:', {
      username: ghData.login,
      publicRepos: ghData.public_repos,
      followers: ghData.followers,
      following: ghData.following,
      avatar: ghData.avatar_url,
      bio: ghData.bio
    });
  } catch(e) { console.error('GitHub error:', e.message); }

  console.log('=== 2. Testing Codeforces API ===');
  try {
    const cfUser = await fetch('https://codeforces.com/api/user.info?handles=tourist');
    const cfData = await cfUser.json();
    if(cfData.status === 'OK') {
      const u = cfData.result[0];
      console.log('Codeforces Real Data:', {
        handle: u.handle,
        rating: u.rating,
        maxRating: u.maxRating,
        rank: u.rank,
        maxRank: u.maxRank,
        avatar: u.titlePhoto
      });
    }
  } catch(e) { console.error('Codeforces error:', e.message); }

  console.log('=== 3. Testing LeetCode Alfa API ===');
  try {
    const lcUser = await fetch('https://alfa-leetcode-api.onrender.com/userProfile/tourist');
    const lcData = await lcUser.json();
    console.log('LeetCode Real Data:', {
      totalSolved: lcData.totalSolved,
      easySolved: lcData.easySolved,
      mediumSolved: lcData.mediumSolved,
      hardSolved: lcData.hardSolved,
      ranking: lcData.ranking
    });
  } catch(e) { console.error('LeetCode error:', e.message); }

  console.log('=== 4. Testing CodeChef Public API ===');
  try {
    const ccUser = await fetch('https://codechef-api.vercel.app/handle/tourist');
    console.log('CodeChef status:', ccUser.status);
    if(ccUser.ok) {
      const ccData = await ccUser.json();
      console.log('CodeChef Real Data:', ccData);
    }
  } catch(e) { console.error('CodeChef error:', e.message); }

  console.log('=== 5. Testing HackerRank REST API ===');
  try {
    const hrUser = await fetch('https://www.hackerrank.com/rest/hackers/tourist/profile');
    console.log('HackerRank status:', hrUser.status);
    if(hrUser.ok) {
      const hrData = await hrUser.json();
      console.log('HackerRank Real Data:', hrData.model?.username, hrData.model?.followers_count);
    }
  } catch(e) { console.error('HackerRank error:', e.message); }
}

testAllPlatforms();
