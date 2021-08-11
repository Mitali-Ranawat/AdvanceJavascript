
const battles = require('./battles.json') 

const getMaxValue = data =>{
    let max = 0;
    let value = "";
    for(let key in data){
        if(data[key] > max){
            max = data[key]
            value = key
        }
    }
    if(max==1) return "All records occur exactly once"
    return value;
}


const battlesData = (battles) => {  
    
    console.log("Question 1");

    let result = {
        most_active: {
            attacker_king: "",
            defender_king: "",
            region: "",
            name:""
        },
        attacker_outcome:{
            win: 0,
            loss: 0
        },
        battle_type: [],
        defender_size:{
            average: 0,
            min: 99999999,
            max: 0
        }
    }

    let attackers = {};
    let defenders = {};
    let regions = {};
    let names = {};
    let sumOfDefenderSize = 0;

    battles.forEach(battle => {
        attackers[battle["attacker_king"]] 
            = attackers[battle["attacker_king"]] 
                ? attackers[battle["attacker_king"]] + 1
                : 1;
        defenders[battle["defender_king"]] 
            = defenders[battle["defender_king"]] 
                ? defenders[battle["defender_king"]] + 1
                : 1;
        regions[battle["region"]] 
            = regions[battle["region"]] 
                ? regions[battle["region"]] + 1
                : 1;
        names[battle["name"]] 
            = names[battle["name"]] 
                ? names[battle["name"]] + 1
                : 1;


        if(battle["attacker_outcome"] == "win") result.attacker_outcome.win += 1
        if(battle["attacker_outcome"] == "loss") result.attacker_outcome.loss += 1


        if(!result.battle_type.includes(battle["battle_type"])){
            result.battle_type.push(battle["battle_type"])
        }

        if(battle["defender_size"]){
            sumOfDefenderSize += battle["defender_size"];
            if(result.defender_size.min > battle["defender_size"]){
                result.defender_size.min = battle["defender_size"];
            }
            else if(result.defender_size.max < battle["defender_size"]){
                result.defender_size.max = battle["defender_size"];
            }
        }
    });
    
    result.most_active.attacker_king = getMaxValue(attackers);
    result.most_active.defender_king = getMaxValue(defenders);
    result.most_active.region = getMaxValue(regions);
    result.most_active.name = getMaxValue(names);

    result.defender_size.average = (sumOfDefenderSize/battles.length).toFixed(2);

    console.log(result);
};

battlesData(battles)