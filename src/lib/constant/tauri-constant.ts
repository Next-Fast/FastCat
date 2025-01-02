import { Invoke_Deault } from "../utils/tarui-utlis"

export const isFirst = () => {
    return Invoke_Deault<boolean>('IsFirst', false);
}