@extends('dashboard.layouts.main')

@section('title')
    Edit meta
@endsection

@section('content')
    <div class="row">
        <div class="col-xs-12">
            <div class="panel panel-default">
                <div class="panel-body">
                    @if (count($errors) > 0)
                        <div class="alert alert-danger">
                            <strong>Whoops!</strong> There were some problems with your input.<br><br>
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif
                    <form role="form" method="post" action="{{ url('dashboard/metas/edit/' . $meta->id) }}">
                        {!! csrf_field() !!}
                        <div class="form-group">
                            <label>Route</label>
                            <input type="text" class="form-control" name="route" value="{{
                                old('route') ? old('route') :
                                (isset($meta->route) ? $meta->route : '') }}" placeholder="Route">
                        </div>
                        <div class="form-group">
                            <label>Title</label>
                            <input type="text" class="form-control" name="title" value="{{
                                old('title') ? old('title') :
                                (isset($meta->title) ? $meta->title : '') }}" placeholder="Title">
                        </div>
                        <div class="form-group">
                            <label>Keywords</label>
                            <input type="text" class="form-control" name="keywords" value="{{
                                old('keywords') ? old('keywords') :
                                (isset($meta->keywords) ? $meta->keywords : '') }}" placeholder="Keywords">
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <textarea name="description" cols="30" rows="10" placeholder="Description">{{
                                old('description') ? old('description') :
                                (isset($meta->description) ? $meta->description : '') }}</textarea>
                        </div>
                        <div class="form-group">
                            <label>Status:</label>
                            <label class="checkbox-inline">
                                <input type="checkbox" class="checkbox" name="active" value="1" {{
                                    old('active') ? (old('active') === '1' ? 'checked' : '') :
                                    (isset($meta->active) ? 'checked' : '') }}>
                                Active
                            </label>
                        </div>
                        <button type="submit" class="btn btn-success">Save</button>
                        <a href="{{ url('dashboard/metas') }}" class="btn btn-default">Go back</a>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
