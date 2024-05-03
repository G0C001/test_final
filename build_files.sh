# Build the project
echo "Building the project..."
pip3 install -r requirements.txt

echo "Collect Static..."
python3.9 manage.py collectstatic