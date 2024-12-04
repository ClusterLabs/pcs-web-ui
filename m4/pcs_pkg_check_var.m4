# use a wrapper to call into PKG_CHECK_VAR to allow to set a default
AC_DEFUN([PCS_PKG_CHECK_VAR], [
  varname=$1
  default=$4
  AC_MSG_CHECKING([for pkg-conf $2 var $3])
  PKG_CHECK_VAR([$1], [$2], [$3])
  AS_VAR_IF([$1], [""],
    [AS_VAR_IF([default], [""],
      AC_MSG_ERROR([not found]),
      [
        AS_VAR_COPY([$varname], [default]) && AC_MSG_RESULT(
          [not found, using default ${!varname}]
        )
      ]
    )],
    [AC_MSG_RESULT([yes (detected: ${!varname})])]
  )
])
