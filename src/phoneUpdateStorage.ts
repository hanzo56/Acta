/** Set after user approves the out-of-office email on the phone-activity graph. */
export const PHONE_UPDATE_COMPLETE_KEY = 'acta-phone-update-complete'

export function readPhoneUpdateComplete(): boolean {
  try {
    return sessionStorage.getItem(PHONE_UPDATE_COMPLETE_KEY) === '1'
  } catch {
    return false
  }
}

export function writePhoneUpdateComplete() {
  try {
    sessionStorage.setItem(PHONE_UPDATE_COMPLETE_KEY, '1')
  } catch {
    /* ignore */
  }
}

export function clearPhoneUpdateComplete() {
  try {
    sessionStorage.removeItem(PHONE_UPDATE_COMPLETE_KEY)
  } catch {
    /* ignore */
  }
}
