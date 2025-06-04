import React from 'react'
import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";
import ProductStore from '../../store/ProductStore';

const ProductImages = () => {

    const { Details } = ProductStore()

    // const images = [
    //     {
    //         original: Details[0]?.details?.img1,
    //         thumbnail: Details[0]?.details?.img1,
    //     },
    //     {
    //         original: Details[0]?.details?.img2,
    //         thumbnail: Details[0]?.details?.img2,
    //     },
    //     {
    //         original: Details[0]?.details?.img3,
    //         thumbnail: Details[0]?.details?.img3,
    //     },
    //     {
    //         original: Details[0]?.details?.img4,
    //         thumbnail: Details[0]?.details?.img4,
    //     },
    //     {
    //         original: Details[0]?.details?.img5,
    //         thumbnail: Details[0]?.details?.img5,
    //     },
    //     {
    //         original: Details[0]?.details?.img6,
    //         thumbnail: Details[0]?.details?.img6,
    //     },
    //     {
    //         original: Details[0]?.details?.img7,
    //         thumbnail: Details[0]?.details?.img7,
    //     },
    //     {
    //         original: Details[0]?.details?.img8,
    //         thumbnail: Details[0]?.details?.img8,
    //     },
    // ];

    const images = [
        {
            original: 'https://cdn.pixabay.com/photo/2020/04/13/14/04/google-5038526_1280.jpg',
            thumbnail: 'https://cdn.pixabay.com/photo/2020/04/13/14/04/google-5038526_1280.jpg',
        },
        {
            original: 'https://cdn.pixabay.com/photo/2020/04/13/14/04/google-5038526_1280.jpg',
            thumbnail: 'https://cdn.pixabay.com/photo/2020/04/13/14/04/google-5038526_1280.jpg',
        },
        {
            original: 'https://cdn.pixabay.com/photo/2020/04/13/14/04/google-5038526_1280.jpg',
            thumbnail: 'https://cdn.pixabay.com/photo/2020/04/13/14/04/google-5038526_1280.jpg',
        },
        {
            original: 'https://cdn.pixabay.com/photo/2020/04/13/14/04/google-5038526_1280.jpg',
            thumbnail: 'https://cdn.pixabay.com/photo/2020/04/13/14/04/google-5038526_1280.jpg',
        },
        {
            original: 'https://cdn.pixabay.com/photo/2020/04/13/14/04/google-5038526_1280.jpg',
            thumbnail: 'https://cdn.pixabay.com/photo/2020/04/13/14/04/google-5038526_1280.jpg',
        },
        {
            original: 'https://cdn.pixabay.com/photo/2020/04/13/14/04/google-5038526_1280.jpg',
            thumbnail: 'https://cdn.pixabay.com/photo/2020/04/13/14/04/google-5038526_1280.jpg',
        },
        {
            original: 'https://cdn.pixabay.com/photo/2020/04/13/14/04/google-5038526_1280.jpg',
            thumbnail: 'https://cdn.pixabay.com/photo/2020/04/13/14/04/google-5038526_1280.jpg',
        },
        {
            original: 'https://cdn.pixabay.com/photo/2020/04/13/14/04/google-5038526_1280.jpg',
            thumbnail: 'https://cdn.pixabay.com/photo/2020/04/13/14/04/google-5038526_1280.jpg',
        },
    ];

    return (
        <>
            <ImageGallery items={images} />
        </>
    )
}

export default ProductImages