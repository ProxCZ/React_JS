import Labels from '../data/labels.json'
import {ERRORS} from "./const";
/**
 * Helper function to get label
 * @param label
 */
export function getLabel(label) {
    const selectedLabel = Labels[label];
    if (selectedLabel !== null && selectedLabel !== undefined) {
        return selectedLabel;
    }
    return ERRORS.NO_LABEL;
}