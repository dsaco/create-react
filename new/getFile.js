const getGI = () => {
    const gitIgnore = `/node_modules
/dist
.DS_Store
    `
    return gitIgnore;
}

module.exports = {
    getGI,
}