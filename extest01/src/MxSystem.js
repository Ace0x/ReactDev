function change_surname(values)
{
    let names = values.split(" ");
    return names[0] + " " + names[1]
}

function invert_date(values)
{
    let fullDate;
    fullDate = values.split("/");
    return fullDate[1] + "/" + fullDate[0] + "/"  + fullDate[2];
}

function email_thingy(values)
{
    return values + "@tec.mx"
}

function grade_switch(values)
{
    if(values >= 93)
        return "A";
    else if(values >= 90)
        return "A-";
    else if(values >= 87)
        return "B+";
    else if(values >= 83)
        return "B";
    else if(values >= 80)
        return "B-";
    else if(values >= 77)
        return "C+";
    else if(values >= 73)
        return "C";
    else if(values >= 70)
        return "C-";
    else if(values >= 67)
        return "D+";
    else if(values >= 64)
        return "D";
    else
        return "E";
} 

export default function evaluate_entry(values){
    return [values[0], change_surname(values[1]), email_thingy(values[2]), invert_date(values[3]), grade_switch(values[4])];
}