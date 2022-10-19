import { createClient } from "next-sanity"
import createImageUrlBuilder from '@sanity/image-url'


//A key thats allows us to connect to our sanity backend 
export const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: "2021-03-25",
    useCdn: process.env.NODE_ENV === "production",
};

//here we do create an instance of a client that we gonna use to connect to sanity
//Set Up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config);

//when we wannt to pull the images :
//hopo funtion to go a head an actually get images as well
export const urlFor = (source) => 
 createImageUrlBuilder(config).image(source);