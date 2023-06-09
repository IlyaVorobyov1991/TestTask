export class Rejection {
    resolvedWithRejectionNumCheck = async (promisesToHandle: Promise<any>[], maxRejectedNum: number): Promise<void> => {
        let rejectedCount = 0;

        return Promise.allSettled(promisesToHandle).then(results => {
            results.forEach(result => {
                if (result.status === 'rejected') {
                    rejectedCount++;
                }
            });
            if (rejectedCount > maxRejectedNum) {
                return Promise.reject();
            } else {
                return Promise.resolve();
            }        })
    }

}
export default Rejection