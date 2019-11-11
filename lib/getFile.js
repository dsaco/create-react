const getGitIgnore = () => {
    return `node_modules
/dist
    `;
}

module.exports = {
    getGitIgnore,
}
