/**
 * Helper function to remove space after carriage return \n in lines
 * @param {string} text
 */
function removeSpaceAfterCarriageReturn(text: string): string {
  return text.replace(/\n /g, '\n');
}

export default removeSpaceAfterCarriageReturn;
