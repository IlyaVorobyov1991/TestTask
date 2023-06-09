import { chromium, Browser, Page } from 'playwright';
import {expect, test} from "@playwright/test";
import Rejection from "./pages/rejection";

describe('Resolved With Rejection Num Check', () => {
    let browser: Browser;
    let page: Page;
    const rejection = new Rejection()

    test.beforeEach(async () => {
        browser = await chromium.launch();
        const context = await browser.newContext();
        page = await context.newPage();
    });

    test('Promises resolved', async () => {
        const promisesArr = [
            Promise.resolve('res 1'),
            Promise.resolve('res 2'),
            Promise.resolve('res 3')
        ];
        const maxRejectedNum = 3;
        await expect(rejection.resolvedWithRejectionNumCheck(promisesArr, maxRejectedNum)).toEqual(Promise.resolve())

    });

    test('With reject equal maxRejectedNum', async () => {
        const promisesArr = [
            Promise.resolve('res 1'),
            Promise.resolve('res 2'),
            Promise.reject('rej 2'),
            Promise.reject('rej 3')
        ];
        const maxRejectedNum = 3;
        await expect(rejection.resolvedWithRejectionNumCheck(promisesArr, maxRejectedNum)).toEqual(Promise.resolve())
    });

    test('With reject more than maxRejectedNum', async () => {
        const promisesArr = [
            Promise.resolve('res 1'),
            Promise.resolve('res 2'),
            Promise.reject('rej 2'),
            Promise.reject('rej 3'),
            Promise.reject('rej 4')
        ];

        const maxRejectedNum = 2;
        await expect(rejection.resolvedWithRejectionNumCheck(promisesArr, maxRejectedNum)).toEqual(Promise.reject())
    });

});
