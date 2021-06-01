export default class ImageService {

    constructor(resource) {
        //Centralize this part of URL configuration
        this._resource = resource(`v1/fotos{/id}`);
    }

    //The methods return a promisse
    
    saveImage(image) {

        if(image._id) {
            return this._resource.update({ id: image._id }, image);
        } else {
            return this._resource.save(image);
        }

    }

    list() {
        return this._resource.query()
                                .then(
                                    res => res.json(),
                                    err => { //Verify the error and throw a error with message
                                        console.log(err);
                                        throw new Error('Não foi possível obter as fotos.');
                                    }
                                );
    }

    delete(id) {
        return this._resource.delete({ id })
                                .then(null, err => {
                                    console.log(err);
                                    throw new Error('Não foi possível remover a foto.');
                                });
    }

    search(id) {
        return this._resource
                    .get({ id })
                    .then(res => res.json());
    }

}