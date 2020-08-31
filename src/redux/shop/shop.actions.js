// export const updateCollection = collectionsMap => ({
//     type: "UPDATE_COLLECTIONS",
//     payload: collectionsMap
// })

import {firestore, convertCollectionSnapShotToMap} from '../../firebase/firebase.util'

export const fetchCollectionsStart = () => ({
    type: "FETCH_COLLECTIONS_START"
});

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collection');

        dispatch(fetchCollectionsStart());

        collectionRef.get().then(snapShot => {
            //the data is on an actual object inside of this snapshot
            const collectionsMap = convertCollectionSnapShotToMap(snapShot);
            // updateCollection(collectionsMap);
            dispatch(fetchCollectionsSuccess(collectionsMap));
            // setIsLoading(false);

        }).catch(err => dispatch(fetchCollectionsFailure(err.message)));
    }
}

export const fetchCollectionsSuccess = collectionsMap => ({
    type: "FETCH_COLLECTIONS_SUCCESS",
    payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
    type: "FETCH_COLLECTIONS_FAILURE",
    payload: errorMessage
})
