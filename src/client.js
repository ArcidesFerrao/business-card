import sanityClient from "@sanity/client";

export default sanityClient({
    projectId: "z4d9j1li",
    dataset: "production",
    useCdn: true,
});