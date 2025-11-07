@echo off
set CURAENGINE_PATH="C:\Program Files\UltiMaker Cura 5.10.2\CuraEngine.exe"
set BASE_PRINTER_DEF="C:\Program Files\UltiMaker Cura 5.10.2\share\cura\resources\definitions\fdmprinter.def.json"
set PRINTER_DEF="C:\Program Files\UltiMaker Cura 5.10.2\share\cura\resources\definitions\creality_ender3.def.json"
set BASE_PRINT_PROFILE="C:\Program Files\UltiMaker Cura 5.10.2\share\cura\resources\definitions\fdmextruder.def.json"
set PRINT_PROFILE="C:\Program Files\UltiMaker Cura 5.10.2\share\cura\resources\extruders\creality_base_extruder_0.def.json"


set INPUT_DIR="D:\Git\BodyParts3D-stl\assets\BodyParts3D_data\test"
set OUTPUT_DIR="D:\Git\BodyParts3D-stl\assets\BodyParts3D_data\GCODE_Output"

mkdir %OUTPUT_DIR% 2>nul

for %%f in ("%INPUT_DIR%\*.stl") do (
    echo Slicing "%%~nf.stl"...
    %CURAENGINE_PATH% slice -j %BASE_PRINTER_DEF% -j %PRINTER_DEF%  -j %bASE_PRINT_PROFILE% -j %PRINT_PROFILE% -o "%OUTPUT_DIR%\%%~nf.gcode" -l "%%f" -s layer_height=0.2 -s infill_density=20 -s support_enable=True -s roofing_layer_count=3 -s flooring_layer_count=3
    echo Finished slicing "%%~nf.stl".
)

echo All files sliced!
pause