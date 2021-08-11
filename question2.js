
const githubAPI = () => {
    console.log("Question 2")
    let query = "";
    query = $("#github").val();
    const url = "https://api.github.com/search/repositories?q="    
    let result = [];
    $.get(url+query)
    .then((data)=>{
        getInfo(data)
        .then(result => {
            console.log(result);
        })
    });

}

    

const getInfo = async (data) => {
    let resultArray = [];
    for (let item of data.items) {
        let owner = {
            login: item.owner.login
        };
        try{
            let res = await fetch(item.owner.url).then(response => response.json());
            owner.name = res.name;
        }catch{
            owner.name = "";
            continue;
        }
        try{
            res = await $.get(item.owner.followers_url);
            owner.followersCount = res.length;
        }
        catch{
            owner.followersCount = 0;
            continue;
        }
        try{
            res = await $.get(item.owner.following_url.split("{")[0]);
            owner.followingCount = res.length;
        }
        catch{
            owner.followingCount = 0;
            continue;
        }
        let numberOfBranch;
        try{
            res = await $.get(item.branches_url.split("{")[0]);
            numberOfBranch = res.length;
        }
        catch{
            numberOfBranch = 0;
            continue;
        }
        
        resultArray.push({
            name: item.name,
            full_name: item.full_name,
            private: item.private,
            owner: owner,
            licenseName: item.license,
            score: item.score,
            numberOfBranch: numberOfBranch
        }); 
    };
    return resultArray;
}