export class ConverterHelper {
    
 static detikKeMenit(jumlahDetik: number): string {
    const menit: number = Math.floor(jumlahDetik / 60);
    const detik: number = jumlahDetik % 60;
    const menitStr: string = menit < 10 ? `0${menit}` : menit.toString();
    const detikStr: string = detik < 10 ? `0${detik}` : detik.toString();
  
    return `${menitStr}:${detikStr}`;
}

}
