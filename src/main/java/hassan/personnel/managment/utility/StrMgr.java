package hassan.personnel.managment.utility;

/**
 * Created by Hassan on 12/23/2016.
 */
public final class StrMgr {

    public static String leftPad(String input, int length, String fill){
        String pad = input.trim() + String.format("%"+length+"s", "").replace(" ", fill);
        return pad.substring(0, length);
    }

    public static String rightPad(String input, int length, String fill){
        String pad = String.format("%"+length+"s", "").replace(" ", fill) + input.trim();
        return pad.substring(pad.length() - length, pad.length());
    }
}