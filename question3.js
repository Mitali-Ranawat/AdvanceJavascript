// QUESTION 3

$.get("http://api.nobelprize.org/v1/prize.json", data => {

    console.log("Question 3")

    filteredData = data.prizes.filter(prize => 
        parseInt(prize.year)>1999 
        && parseInt(prize.year)<2020
        && prize.category == "chemistry"
    )
    
    let result = [];
    filteredData.forEach(data => 
        result = result.concat(data.laureates.map(laureate => 
            laureate.firstname +' '+ laureate.surname)
        )
    )
    console.log(result)
})