
export namespace Util {
    export const removePrefix = (base: string, prefix: string): string => {
        const hasPrefix = base.indexOf(prefix) === 0;
        return hasPrefix
            ? base.substring(prefix.length)
            : base.toString();
    }
}