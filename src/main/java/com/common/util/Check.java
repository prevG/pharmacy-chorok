package com.common.util;

public class Check {

	public static boolean emptyCheck(String str) {
		return str == null || "".equals(str.trim());
	}

	public static boolean sizeCheck(String str, int min, int max) {
		return str.length() < min || str.length() > max;
	}

	public static boolean emailCheck(String str) {
		return !str.contains("@") || !str.contains(".");
	}

	public static boolean numberCheck(String str) {
		try {
			Integer.parseInt(str);
		} catch (Exception e) {
			return true;
		}
		return false;
	}
}
