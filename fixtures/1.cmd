rem begin nsi
rem author=me
rem version=6.6.6
rem description=The description of whatever this script does
set wd=C:\whatever\
set cmd=""
set stdout=""
set stderr=""
rem begin env
set some=thing
set else=yep
rem end env
rem end nsi

cd %wd%
%cmd% ^>^> %stdout% 2^>^> %stderr%
