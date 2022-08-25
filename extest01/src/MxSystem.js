function change_surname(values)
{
        return values.split(" ");
}
function invert_date(values)
{
    let fullDate;
    fullDate = values.split("/");
    return fullDate[1] + fullDate[0] + fullDate[2];
}
function grade_switch(values)
{
    if(values <= 93)
        return ["A", 4.0];
    else if(values <= 90)
        return ["A-", 3.7];
    else if(values <= 87)
        return ["B+", 3.3];
    else if(values <= 83)
        return ["B", 3.0];
    else if(values <= 80)
        return ["B-", 2.7];
    else if(values <= 77)
        return ["C+",2.3];
    else if(values <= 73)
        return ["C",2.0];
    else if(values <= 70)
        return ["C-",1.7];
    else if(values <= 67)
        return ["D+",1.3];
    else if(values <= 64)
        return ["D",1.0];
    else
        return ["E",0.7];
} 
function evaluate_entry(values){
    return [change_surname(values[0]), invert_date(values[1]), grade_switch(values[2])];
}