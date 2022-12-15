const replaceUrlHelper = (object, fromUrl, toUrl) =>
{
    return object.split(fromUrl).join(toUrl)
}
export { replaceUrlHelper }
