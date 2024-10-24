#                                               -*- Autoconf -*-
# Process this file with autoconf to produce a configure script.

AC_PREREQ([2.63])
AC_INIT([pcs-web-ui],
	m4_esyscmd([make/git-version-gen .tarball-version .gitarchivever --prefix ""]),
	[developers@clusterlabs.org])

# dist-bzip2 dist-xz - which archivers try to use for distribution archive
# -Wno-portability - disables some warnings about code portability
# tar-pax - use tar with pax during creating archive to ensure keep permissions
AM_INIT_AUTOMAKE([dist-bzip2 dist-xz -Wno-portability tar-pax])

AC_CONFIG_MACRO_DIR([m4])

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

# Decide what to install. 3 options here:
# * both - standalone and cockpit
# * just standalone
# * just cockpit
AC_ARG_ENABLE([standalone],
  [AS_HELP_STRING([--disable-standalone], [Disable standalone installation])],
  [enable_standalone="$enableval"],
  [enable_standalone="yes"],
)
AC_ARG_ENABLE([cockpit],
  [AS_HELP_STRING([--disable-cockpit], [Disable cockpit installation])],
  [enable_cockpit="$enableval"],
  [enable_cockpit="yes"],
)
if test "x$enable_standalone" != "xyes" && test "x$enable_cockpit" != "xyes";
then
  AC_MSG_ERROR([--disable-cockpit cannot be used with --disable-standalone])
fi
AM_CONDITIONAL([ENABLE_STANDALONE], [test "x$enable_standalone" = "xyes"])
AM_CONDITIONAL([ENABLE_COCKPIT], [test "x$enable_cockpit" = "xyes"])

# Deal with installation locations. Priorities:
# * user input
# * pkg-config
# * default value
AC_ARG_WITH([pcsd-webui-dir],
  [AS_HELP_STRING(
    [--with-pcsd-webui-dir=DIR],
    [webui installation directory (default: pkg-config detection from pcs)]
  )],
  [PCSD_WEBUI_DIR="$withval"],
  [PKG_CHECK_VAR([PCSD_WEBUI_DIR], [pcs], [webui_dir])]
)
AC_SUBST([PCSD_WEBUI_DIR])

AC_ARG_WITH([cockpit-dir],
  [AS_HELP_STRING(
    [--with-cockpit-dir=DIR],
    [cockpit installation directory (default: no cockpit installation)]
  )],
  [COCKPIT_DIR="$withval"],
)
AC_SUBST([COCKPIT_DIR])

PKG_CHECK_VAR([PCSD_UNIX_SOCKET], [pcs], [pcsd_unix_socket])
AC_SUBST([PCSD_UNIX_SOCKET])

# required for man page and spec file generation
AX_PROG_DATE
AS_IF([test "$ax_cv_prog_date_gnu_date:$ax_cv_prog_date_gnu_utc" = yes:yes],
	[UTC_DATE_AT="date -u -d@"],
	[AS_IF([test "x$ax_cv_prog_date_bsd_date" = xyes],
		[UTC_DATE_AT="date -u -r"],
		[AC_MSG_ERROR([date utility unable to convert epoch to UTC])])])
AC_SUBST([UTC_DATE_AT])

AC_ARG_VAR([SOURCE_EPOCH],[last modification date of the source])
AC_MSG_NOTICE([trying to determine source epoch])
AC_MSG_CHECKING([for source epoch in \$SOURCE_EPOCH])
AS_IF([test -n "$SOURCE_EPOCH"],
	[AC_MSG_RESULT([yes])],
	[AC_MSG_RESULT([no])
	 AC_MSG_CHECKING([for source epoch in source_epoch file])
	 AS_IF([test -e "$srcdir/source_epoch"],
		[read SOURCE_EPOCH <"$srcdir/source_epoch"
		 AC_MSG_RESULT([yes])],
		[AC_MSG_RESULT([no])
		 AC_MSG_CHECKING([for source epoch baked in by gitattributes export-subst])
		 SOURCE_EPOCH='$Format:%at$' # template for rewriting by git-archive
		 AS_CASE([$SOURCE_EPOCH],
			[?Format:*], # was not rewritten
				[AC_MSG_RESULT([no])
				 AC_MSG_CHECKING([for source epoch in \$SOURCE_DATE_EPOCH])
				 AS_IF([test "x$SOURCE_DATE_EPOCH" != x],
					[SOURCE_EPOCH="$SOURCE_DATE_EPOCH"
					 AC_MSG_RESULT([yes])],
					[AC_MSG_RESULT([no])
					 AC_MSG_CHECKING([whether git log can provide a source epoch])
					 SOURCE_EPOCH=f${SOURCE_EPOCH#\$F} # convert into git log --pretty format
					 SOURCE_EPOCH=$(cd "$srcdir" && git log -1 --pretty=${SOURCE_EPOCH%$} 2>/dev/null)
					 AS_IF([test -n "$SOURCE_EPOCH"],
						[AC_MSG_RESULT([yes])],
						[AC_MSG_RESULT([no, using current time and breaking reproducibility])
						 SOURCE_EPOCH=$(date +%s)])])],
			[AC_MSG_RESULT([yes])]
		 )])
	])
AC_MSG_NOTICE([using source epoch $($UTC_DATE_AT$SOURCE_EPOCH +'%F')])

AC_CONFIG_FILES([Makefile
		 packages/app/Makefile
		 packages/test/Makefile])

# AC_CONFIG_FILES([packages/app/.bin/check-assumptions.sh], [chmod +x pcs/pcs_internal])
AC_OUTPUT
