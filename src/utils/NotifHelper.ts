import { Toast } from 'native-base'

export function showErrorToast(
  e: Error | any,
  defaultMessage: string = 'Something went wrong',
) {
  const id = e.data?.Message || e.message || defaultMessage

  if (!Toast.isActive(id)) {
    Toast.show({
      id,
      title: `[ERROR] ${e.data?.Message || e.message || defaultMessage}`,
    })
  }
}
