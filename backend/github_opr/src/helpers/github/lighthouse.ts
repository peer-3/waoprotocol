import lighthouse from '@lighthouse-web3/sdk'

const apiKey = '29d7a66c.24ab11b5bd844245977fd038ea79d454'

export const uploadResponse = async (path?: string, dealParams?: any) => {
    try {
        const data = await lighthouse.upload(path, apiKey, dealParams);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}