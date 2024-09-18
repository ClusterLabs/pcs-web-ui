#                                               -*- Autoconf -*-
# Process this file with autoconf to produce a configure script.

AC_PREREQ([2.63])
AC_INIT([pcs-web-ui],
	[m4_esyscmd([make/git-version-gen .tarball-version .gitarchivever])],
	[developers@clusterlabs.org])

# dist-bzip2 dist-xz - which archivers try to use for distribution archive
# -Wno-portability - disables some warnings about code portability
# tar-pax - use tar with pax during creating archive to ensure keep permissions
AM_INIT_AUTOMAKE([dist-bzip2 dist-xz -Wno-portability tar-pax])


# Checks for programs.

# check stolen from gnulib/m4/gnu-make.m4
if ! ${MAKE-make} --version /cannot/make/this >/dev/null 2>&1; then
	AC_MSG_ERROR([you don't seem to have GNU make; it is required])
fi
AC_PROG_INSTALL
AC_PROG_GREP
AC_PROG_SED
AC_PROG_MAKE_SET
AC_PROG_MKDIR_P

# Checks for libraries.

# Checks for header files.

# Checks for typedefs, structures, and compiler characteristics.

# Checks for library functions.


# this will catch both ID and ID_LIKE from os-release

# PKG_CHECK_MODULES([pcs], [pcs])
PKG_CHECK_VAR([PCSD_WEBUI_DIR], [pcs], [webui_dir])
AC_SUBST([PCSD_WEBUI_DIR])

PKG_CHECK_VAR([PCSD_WEBUI_DIR], [pcs], [pcsd_unix_socket])
AC_SUBST([PCSD_UNIX_SOCKET])

AC_CONFIG_FILES([Makefile
		 packages/app/Makefile
		 packages/test/Makefile])
# AC_CONFIG_FILES([packages/app/.bin/check-assumptions.sh], [chmod +x pcs/pcs_internal])
AC_OUTPUT
