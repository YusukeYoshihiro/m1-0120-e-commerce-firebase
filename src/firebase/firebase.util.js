import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

const config = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    databaseURL: process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    //if the useauth object doesnt exists
    if(!userAuth) return;

    //query the firestore for the doc to see if it already exists
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    
    //to understand what we will get back.
    //firestore returns us two types of objects: references and snapshots
    //of these objects, they can be either document or collection versions.
    
    //firestore will always return us these objects, even if nothing exists at from that query.

    //we use document references to perform CRUD methods (create,retrieve, update and delete)

    //we get the snapshotObject from the reference object using the .get() method
    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
            
        } catch (error) {
            console.log('Error creating user: ', error.message);
        }
    }

    return userRef;
}

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {

    //this will return us a reference object
    const collectionRef = firestore.collection(collectionKey);

    //to prevent inconsistency or unpredictability in the code, we implement a batch write
    //it is essentially just a way to group our calls together in to one big request
    const batch = firestore.batch();

    //loop over the objects
    objectToAdd.forEach(obj => {
        //this tell the firebase to give us a new document reference in 'collection' and randomly generate an ID for us
        const newDocRef = collectionRef.doc();

        //set the value (each obj) to the document that we newly created
        batch.set(newDocRef, obj);
    });

    //fire off/execute the request to firestore
    return await batch.commit();
}

export const convertCollectionSnapShotToMap = collections => {

    const transformedCollection = collections.docs.map(doc => {
        const {title, items} = doc.data();
        return{
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {})
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

