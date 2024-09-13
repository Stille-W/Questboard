package com.guild.entity;

public class Species {

    private Integer sid;
    private String sname;
    private String description;
    private String note;

    public Integer getSid() {
        return sid;
    }

    public void setSid(Integer sid) {
        this.sid = sid;
    }

    public String getSname() {
        return sname;
    }

    public void setSname(String sname) {
        this.sname = sname;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    @Override
    public String toString() {
        return "Species{" +
                "sid=" + sid +
                ", sname='" + sname + '\'' +
                ", description='" + description + '\'' +
                ", note='" + note + '\'' +
                '}';
    }
}
