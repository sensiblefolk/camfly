import { currentAccount, firebaseAuth } from './user';

const getToken = async () => {
    await currentAccount();
    const token = await firebaseAuth().currentUser?.getIdToken();
    return token
};

export default getToken;
