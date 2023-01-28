
async function signMessage(msg) {
    let hashedMsg = hashMessage(msg);
    
    let signedHash = secp.sign(hashedMsg, MY_PRIVATE_KEY, { recovered: true });
    return signedHash;
}

export { signMessage };