const axios= require("axios");

const handleRatings=async(cfHandle)=>{

    try {

        const response=await axios.get(`${process.env.CODEFORCES_INFO_API}?handles=${cfHandle}`);

        if(response.status !== 200){
            return{
                message: "Invalid Codeforces handle or error fetching data"
            };
        }

        const user=response.data.result[0];
        const currentRating=user.rating || 0;
        const maxRating=user.maxRating || 0;
        const maxRank=user.maxRank || "NA";
        const currentRank=user.rank || "NA";
        const titlePhoto=user.titlePhoto || "https://userpic.codeforces.org/no-title.jpg";


        return{
            currentRating,
            maxRating,
            maxRank,
            currentRank,
            titlePhoto
        };

    } catch (error) {
        console.log("Error fetching user rating:", error.message);
        return{
            currentRating: 0,
            maxRating: 0,
            maxRank: "NA",
            currentRank: "NA",
            titlePhoto: "https://userpic.codeforces.org/no-title.jpg"
        };
    }
};


const handleContestHistory=async(cfHandle)=>{
    try {

        const response_contest=await axios.get(`${process.env.CODEFORCES_RATING_API}?handle=${cfHandle}`);
        const allContest=response_contest?.data?.result || [];

        const response_submission=await axios.get(`${process.env.CODEFORCES_STATUS_API}?handle=${cfHandle}`);
        const allSubmissions=response_submission?.data?.result || [];

        const contestData = [];
        const ratingGraph = [];

        allContest.forEach(fc=>{
            const contestId = fc.contestId;
            const allProblems = {};
            const solvedProblems = {};

            allSubmissions.forEach(asub=>{
                if (contestId !== asub.problem.contestId) return;
                const key=`${contestId}-${asub.problem.index}`;
                allProblems[key]=true;
                if(asub.verdict === "OK"){
                    solvedProblems[key]=true;
                }
            });

            let unsolved = 0;
            for(let key in allProblems){
                if(!solvedProblems[key]){
                    unsolved++;
                }
            }

            contestData.push({
                contestId,
                contestName: fc.contestName,
                newRating: fc.newRating,
                oldRating: fc.oldRating,
                rank: fc.rank,
                ratingChange: fc.newRating - fc.oldRating,
                unsolved
            });

            ratingGraph.push({
                timestamp: new Date(fc.ratingUpdateTimeSeconds * 1000),
                rating: fc.newRating
            });
        });

        return {
            contestCount: allContest.length,
            contestData,
            ratingGraph
        };

    } catch (error) {
        console.log("ERROR FETCHING CONTEST HISTORY FROM CODEFORCES:", error.message);
        return {
            contestCount: 0,
            contestData: [],
            ratingGraph: []
        };
    }
};


const handleProblemSolvingData=async(cfHandle)=>{
    try {

        const response_submissions=await axios.get(`${process.env.CODEFORCES_STATUS_API}?handle=${cfHandle}`);
        const allSubmissions=response_submissions?.data?.result || [];

        const solvedSubmissions=allSubmissions.filter(fsub=>fsub.verdict === "OK");
        let highestRatingSolved = 0;

        solvedSubmissions.forEach(fs=>{
            const rating = fs.problem.rating;
            if(rating && rating > highestRatingSolved){
                highestRatingSolved=rating;
            }
        });
        
        const uniqueSolvedProblems={};

        solvedSubmissions.forEach(ssub=>{
            const problem=ssub.problem;
            const key=`${problem.contestId}-${problem.index}`;
            if(!uniqueSolvedProblems[key]){
                uniqueSolvedProblems[key]=problem;
            }
        });

        const uniqueSolved=Object.values(uniqueSolvedProblems);
        const totalSolved=uniqueSolved.length;

        let sumRating=0;
        let ratedCount=0;
        const ratingBucket={};

        for(let i=800;i<=3500;i+=100){
            ratingBucket[i]=0;
        }

        uniqueSolved.forEach(us=>{
            if(us.rating){
                sumRating+=us.rating;
                ratedCount++;

                const bucket=Math.floor(us.rating / 100) * 100;
                ratingBucket[bucket]++;
            }
        });

        const averageRating=ratedCount > 0? (sumRating/ratedCount).toFixed(2):0;

        const solvedPerday={};
        solvedSubmissions.forEach(ss => {
            const problem_date=new Date(ss.creationTimeSeconds * 1000).toISOString().slice(0, 10);
            if(!solvedPerday[problem_date]){
                solvedPerday[problem_date] = 1;
            } else{
                solvedPerday[problem_date]++;
            }
        });

        return {
            totalSolved,
            highestRatingSolved,
            averageRating,
            ratingBucket,
            solvedPerday,
        };

    }catch (error) {
        console.error("Error Fetching Codeforces Data:", error.message);
        return {
            totalSolved: 0,
            highestRatingSolved: 0,
            averageRating: "0",
            ratingBucket: {},
            solvedPerday: {},
        };
    }
};


module.exports={
    handleRatings,
    handleContestHistory,
    handleProblemSolvingData,
};