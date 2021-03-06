export function centerText(txt: string, options: any, x: number, y: number) {
    options = options || {};
    /* Use the options align property to specify desired text alignment
        * Param x will be ignored if desired text alignment is 'center'.
        * Usage of options can easily extend the function to apply different text 
        * styles and sizes 
    */
    if ( options.align == "center" ) {
        // Get current font size
        const fontSize = this.internal.getFontSize();
        // Get page width
        const pageWidth = this.internal.pageSize.width;
        // Get the actual text's width
            /* You multiply the unit width of your string by your font size and divide
             * by the internal scale factor. The division is necessary
             * for the case where you use units other than 'pt' in the constructor
             * of jsPDF.
        */
        const txtWidth = this.getStringUnitWidth(txt) * fontSize / this.internal.scaleFactor;

        // Calculate text's x coordinate
        x = (pageWidth - txtWidth) / 2;
    }

    // Draw text at x,y
    this.text(txt, x, y);
}
