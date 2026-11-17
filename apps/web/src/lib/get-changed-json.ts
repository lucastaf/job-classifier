export function getChangedJson<T extends Record<string, unknown>>(oldData: T, newData: T): Partial<T> {
    const resData: Partial<T> = {};
    Object.keys(oldData).forEach(key => {
        if (JSON.stringify(oldData[key]) != JSON.stringify(newData[key])) {
            const typedKey = key as keyof T;
            (resData as Record<keyof T, T[keyof T]>)[typedKey] = newData[typedKey];
        }
    })

    return resData;
}