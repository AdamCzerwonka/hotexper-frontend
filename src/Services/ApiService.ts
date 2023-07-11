const ApiPath = "http://localhost:5062/api";

const GetApiPath = (path:string) => {
    if(!path.startsWith("/")) {
        return `${ApiPath}/${path}`;
    }
    return ApiPath + path;
}

export {ApiPath, GetApiPath};
