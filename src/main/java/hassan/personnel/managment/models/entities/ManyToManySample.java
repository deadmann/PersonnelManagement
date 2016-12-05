//@Entity
//public class Woman {
//    ...
//    @ManyToMany(cascade = {CascadeType.ALL})
//    //if this annotation is not on owning side, with inverse we point to other side
//    @ForeignKey(name = "TO_WOMAN_FK", inverseName = "TO_MAN_FK")
//    public Set<Man> getMens() {
//        return mens;
//    }
//}