'use strict';

function validate () {
    return {
        validateEmail: function (mail)
        {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
            {
                return (true);
            }
            return (false);
        }
    };
}

module.exports = validate();


