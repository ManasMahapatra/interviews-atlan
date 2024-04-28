import { UserDetailType } from "../NewsPageTypes"
import { faker } from '@faker-js/faker';

let LAST_SERIAL_NUMBER = 0;

export const generateFakeUsers = (limit: number, isNewSetRequest: boolean, nameQuery?: string): UserDetailType[] => {
    if (isNewSetRequest) {
        LAST_SERIAL_NUMBER = 0;
    }
    const userData = [];
    for (let i = 0; i < limit; i++) {
        const userDetail = {
            indexNumber: LAST_SERIAL_NUMBER + 1,
            userName: nameQuery || faker.person.fullName(),
            userAge: faker.datatype.number({ min: 18, max: 100 }),
            userGender: faker.person.gender(),
            userJobTitle: faker.person.jobTitle(),
            userJobDescription: faker.person.jobDescriptor(),
            userEmail: faker.internet.email(),
            userMobileNumber: faker.phone.number(),
        }
        LAST_SERIAL_NUMBER++
        userData.push(userDetail);
    }
    return userData;
}