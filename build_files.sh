# Build the project
echo "Building the project..."
pip3 install -r requirements.txt

echo "Collect Static..."
python manage.py collectstatic