export PRACTICAS_DIR="practica-0,practica-1,practica-2,practica-3,practica-4,practica-5,practica-6,practica-7,practica-8,practica-9,proyecto-final"
IFS=',' read -ra PRACTICAS_ARRAY <<< "$PRACTICAS_DIR"
for directory in "${PRACTICAS_ARRAY[@]}"; do
  if [[ -d "$directory" && -f "$directory/build.gradle" ]]; then
    gradle -p $directory clean build
  else
    echo "$directory is not a gradle project."
  fi
done