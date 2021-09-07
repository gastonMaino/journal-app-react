import cloudinary from 'cloudinary';

import { fileUpload } from "../../helpers/fileUpload";


cloudinary.config({
    cloud_name: 'duiizssxa',
    api_key: '785832329446511',
    api_secret: 'ew4jQIa7DypKhGTAG9Wp6ERAv34',
    secure: true
});


describe('test in fileUpload.js', () => {
    // test('should load at archive and return url', async (done) => {
    //     const resp = await fetch('https://thumbs.dreamstime.com/b/cosmos-beauty-deep-space-elements-image-furnished-nasa-science-fiction-art-102581846.jpg');

    //     const blob = await resp.blob();

    //     const file = new File([blob], 'foto.jpg');

    //     const url = await fileUpload(file);

    //     expect(typeof url).toBe('string');

    //     const segments = url.split(`/`);
    //     const imageId = segments[segments.length - 1].replace('.jpg', '');
    //     const fodelName = 'assets'

    //     cloudinary.v2.api.delete_resources(`${fodelName}/${imageId}`, {}, async () => {
    //        await done();
    //     });
    // })

    test('should return a error', async () => {
        const file = new File([], 'foto.jpg');

        const url = await fileUpload(file);

        expect(url).toBe(null);
    })

})
