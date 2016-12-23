package hassan.personnel.managment.utility;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/**
 * Created by Hassan on 12/23/2016.
 */
public class ZipUtil {
    public static void ToZip(String inputFiles[], String outputFile) throws IOException {
        //create byte buffer
        byte[] buffer = new byte[1024];

                /*
                 * To create a zip file, use
                 *
                 * ZipOutputStream(OutputStream out)
                 * constructor of ZipOutputStream class.
                */

        //create object of FileOutputStream
        FileOutputStream fout = new FileOutputStream(outputFile);

        //create object of ZipOutputStream from FileOutputStream
        ZipOutputStream zout = new ZipOutputStream(fout);

        for (int i = 0; i < inputFiles.length; i++) {
            //create object of FileInputStream for source file
            FileInputStream fin = new FileInputStream(inputFiles[i]);

                        /*
                         * To begin writing ZipEntry in the zip file, use
                         *
                         * void putNextEntry(ZipEntry entry)
                         * method of ZipOutputStream class.
                         *
                         * This method begins writing a new Zip entry to
                         * the zip file and positions the stream to the start
                         * of the entry data.
                         */

            zout.putNextEntry(new ZipEntry(inputFiles[i]));

                        /*
                         * After creating entry in the zip file, actually
                         * write the file.
                         */
            int length;

            while ((length = fin.read(buffer)) > 0) {
                zout.write(buffer, 0, length);
            }

                        /*
                         * After writing the file to ZipOutputStream, use
                         *
                         * void closeEntry() method of ZipOutputStream class to
                         * close the current entry and position the stream to
                         * write the next entry.
                         */

            zout.closeEntry();

            //close the InputStream
            fin.close();

        }


        //close the ZipOutputStream
        zout.close();
    }
}
