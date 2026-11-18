export function getChangedJson<T extends Object>(oldData: T, newData: Partial<T>): Partial<T> | undefined {
    const resData: Partial<T> = {};
    Object.keys(oldData).forEach(key => {
        const typedKey = key as keyof T;
        if (JSON.stringify(oldData[typedKey]) != JSON.stringify(newData[typedKey]) && newData[typedKey]) {
            (resData)[typedKey] = newData[typedKey];
        }
    })

    if (Object.keys(resData).length == 0) {
        return undefined
    }

    return resData;
}