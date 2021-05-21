// objects for event
const form = document.getElementById("form");
const username = document.getElementById("Username");
const email = document.getElementById("Email");
const password = document.getElementById("Password");
const confirmPassword = document.getElementById("Confirmpassword");
const nolowercasepassword = document.getElementById("1");
const nouppercasepassword = document.getElementById("2");
const nonumbercasepassword = document.getElementById("3");
const nospecialcasepassword = document.getElementById("4");
const checkbox=document.getElementById("showpassword");



// regex for passwordcheck

const lowercaseregex = /[a-z]+/;
const uppercaseregex = /[A-Z]+/;
const numberregex = /[0-9]+/;
const specialcaseregex = /[!@#$%^&*(){}+]+/;

//variable for passwordcheck
let lower = false;
let upper = false;
let number = false;
let special = false;

//event function

function showError(element, message)
{

    const parent = element.parentElement;
    parent.className = "form-control error";
    parent.querySelector("small").innerText = message;
    parent.querySelector(".check").setAttribute("class","check svg-control svg-position svg-hidden");
    parent.querySelector(".exclamation").setAttribute("class","exclamation svg-control svg-position svg-visible");

}

function showErrorForList(element)
{
    element.className = "errorforpassword";

}

function showSuccess(element)
{
    const parent = element.parentElement;
    parent.className = "form-control success";
    parent.querySelector(".exclamation").setAttribute("class","exclamation svg-control svg-position svg-hidden");
    parent.querySelector(".check").setAttribute("class","check svg-control svg-position svg-visible");

}

function showSuccessForList(element)
{
    element.className = "successforpassword";
}

function checkAllElements(elementsarray)
{

    let returnvalue = true;

    elementsarray.forEach(function (items)
    {
        items.value = items.value.trim();
        if (items.value === "")
        {
            showError(items, `${items.id} is Required`);
            returnvalue = returnvalue && false;
        }
        else
        {
            returnvalue = returnvalue && true;

        }

    });

    return returnvalue;


}


function checkusername(username)
{
    const checkusername = /^[A-Za-z]+$/;
    const checkspce = /\S/;
    username.value=username.value.trim();

    if (checkspce.test(username.value))
    {
        if (checkusername.test(username.value))
        {
            showSuccess(username);
            return true;
        }
        else
        {
            showError(username, "Username can contain only Alphabets");
            return false;
        }
    }
    else
    {
        showError(username, "Username is Required");
        return false;
    }
}


function checkemail(email)
{
    const checkemail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const checkspace = /\S/;
    email.value=email.value.trim();
    if (checkspace.test(email.value))
    {
        if (checkemail.test(email.value))
        {
            showSuccess(email);
            return true;
        }
        else
        {
            showError(email, "Invalid Email");
            return false;
        }
    }
    else
    {
        showError(email, "Email is Required");
        return false;
    }
}

function settrueforpassword(regex, value)
{
    if (regex === lowercaseregex)
    {
        lower = value;
    }
    else if (regex === uppercaseregex)
    {
        upper = value;
    }
    else if (regex === numberregex)
    {
        number = value;
    }
    else if (regex === specialcaseregex)
    {
        special = value;
    }
}

function checkRegex(regex, password, element)
{
    if (regex.test(password.value))
    {
        showSuccessForList(element);
        settrueforpassword(regex, true);
    }
    else
    {
        showErrorForList(element);
        settrueforpassword(regex, false);
    }

}

function validatepassword(password)
{

    password.value=password.value.trim();

    checkRegex(lowercaseregex, password, nolowercasepassword);
    checkRegex(uppercaseregex, password, nouppercasepassword);
    checkRegex(numberregex, password, nonumbercasepassword);
    checkRegex(specialcaseregex, password, nospecialcasepassword);

    if (lower && upper && number && special)
    {
        showSuccess(password);
        return true;
    }
    else
    {
        showError(password, "Password Should Match Given Condition");
        return false;
    }
}


function checkpasswordlenght(confirmpassword, password)
{

    confirmpassword.value=confirmpassword.value.trim();

    if (confirmpassword.value !== "")
    {
        if (confirmpassword.value === password.value)
        {
            showSuccess(confirmpassword);
            return true;
        }
        else
        {
            showError(confirmpassword, "Password Didn't Match");
            return false;
        }
    }
    else
    {
        showError(confirmpassword, `${confirmpassword.id} is Required`);
        return false;
    }

}

// event listeners

//submit event

form.addEventListener("submit", function (e)
{

    if (!(checkAllElements([username, email, password, confirmPassword]) && checkusername(username) && checkemail(email) && validatepassword(password) && checkpasswordlenght(confirmPassword, password)))
    {
        e.preventDefault();
    }


});

// keyup events

username.addEventListener("keyup", function ()
{
    checkusername(username);
});

email.addEventListener("keyup", function ()
{
    checkemail(email);
});


password.addEventListener("keyup", function ()
{
    validatepassword(password);
    checkpasswordlenght(confirmPassword,password);

});

confirmPassword.addEventListener("keyup", function ()
{
    checkpasswordlenght(confirmPassword, password);
});

// Click Event




checkbox.addEventListener("click",function ()
{
    let inputype=password.getAttribute("type");

    if(inputype==="password")
    {
        password.setAttribute("type","text");
        confirmPassword.setAttribute("type","text");
    }
    else
    {
        password.setAttribute("type","password");
        confirmPassword.setAttribute("type","password");
    }

});


