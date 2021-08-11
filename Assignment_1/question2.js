
const githubAPI = () => {
    console.log("Question 2")
    let query = "";
    query = $("#github").val();
    const url = "https://api.github.com/search/repositories?q="    
    let result = [];
    fetch(url+query).then(res => res.json())
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
            await fetch(item.owner.url).then(res => res.json()).then((data) => {
               owner.name = data.name;
            });
            
        }catch{
            owner.name = "";
            continue;
        }
        try{

            await fetch(item.owner.followers_url).then(res => res.json()).then((data)=> {
                       owner.followersCount = data.length;
            });
        }
         
        catch{
            owner.followersCount = 0;
            continue;
        }
        try{
            url = item.owner.following_url.split("{")[0];
            await fetch(url).then(res => res.json()).then((data) => {
                owner.followingCount = data.length;
            });
        }
        catch{
            owner.followingCount = 0;
            continue;
        }
        let numberOfBranch;
        try{
            url = item.branches_url.split("{")[0];
            await fetch(url).then(res => res.json()).then((data) => {
                numberOfBranch= data.length;
        });
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
