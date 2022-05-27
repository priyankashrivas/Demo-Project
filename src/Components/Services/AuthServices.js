export function saveTokenLocalStorage(tokenInfo)
{
    tokenInfo.expireDate = new Date(new Date().getTime + tokenInfo.expiresIn * 1000);
    localStorage.setItem("userDetails",JSON.stringify(tokenInfo));
}
export function formatError(errorResponse) {
    switch (errorResponse.error.message){
        case "EMAIL EXISTS":
            return "Email already exists";
    default:
        return "";
        }
    
    
}