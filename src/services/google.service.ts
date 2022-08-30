import {OAuth2Client} from 'google-auth-library';

const client = new OAuth2Client(`${process.env.OAuth2Client_clientId}`);

export const googleVerify = async (token: string) => {

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: `${process.env.OAuth2Client_clientId}`,
    });

    const payload = ticket.getPayload();

    const {given_name, family_name, email} = payload as any;

    return {given_name, family_name, email};

};
